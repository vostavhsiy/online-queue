import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Server } from 'http';

@Injectable()
export class LibService implements OnModuleInit {
  private server: Server;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  onModuleInit() {
    this.server = this.httpAdapterHost.httpAdapter.getHttpServer();
  }

  getServerAddress(): string {
    const address = this.server.address();
    if (typeof address === 'string') {
      return address;
    }
    return `${address.address}:${address.port}`;
  }
}
