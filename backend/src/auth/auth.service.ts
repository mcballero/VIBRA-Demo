import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { AuthPayload, UserProfile } from "@thirdspace/shared";
import { PrismaService } from "../common/config/prisma.service";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async signup(dto: SignupDto): Promise<AuthPayload> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });

    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        name: dto.name,
        city: dto.city,
        latitude: dto.latitude,
        longitude: dto.longitude,
        interests: dto.interests
      }
    });

    await this.usersService.setMockEmbedding(user.id, dto.interests);

    return this.buildAuthResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city ?? undefined,
      latitude: user.latitude ?? undefined,
      longitude: user.longitude ?? undefined,
      interests: user.interests as UserProfile["interests"]
    });
  }

  async login(dto: LoginDto): Promise<AuthPayload> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.buildAuthResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city ?? undefined,
      latitude: user.latitude ?? undefined,
      longitude: user.longitude ?? undefined,
      interests: user.interests as UserProfile["interests"]
    });
  }

  private buildAuthResponse(user: UserProfile): AuthPayload {
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email
    });

    return { token, user };
  }
}

