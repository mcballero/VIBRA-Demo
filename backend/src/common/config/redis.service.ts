import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(
      this.configService.get<string>("REDIS_URL") ?? "redis://localhost:6379",
      {
        lazyConnect: true,
        maxRetriesPerRequest: 1
      }
    );
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      await this.client.connect();
    } catch {}

    const payload = await this.client.get(key);
    return payload ? (JSON.parse(payload) as T) : null;
  }

  async set(key: string, value: unknown, ttlSeconds = 300) {
    try {
      await this.client.connect();
    } catch {}

    await this.client.set(key, JSON.stringify(value), "EX", ttlSeconds);
  }

  async del(key: string) {
    try {
      await this.client.connect();
    } catch {}

    await this.client.del(key);
  }

  async onModuleDestroy() {
    if (this.client.status === "ready") {
      await this.client.quit();
    }
  }
}

