import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';
import { RedisOptions } from 'ioredis';

class ConfigService {
    constructor(private readonly env: { [k: string]: string | undefined }) {
        dotenv.config();
        dotenvExt.load({
            schema: '.env.example',
            errorOnMissing: true,
            includeProcessEnv: true,
        });
    }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]): ConfigService {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort(): string {
        return this.getValue('PORT', true);
    }

    public isProduction(): boolean {
        const mode = this.getValue('MODE', false);
        return mode !== 'DEV';
    }

    /**
     * Returns Orm config object
     */
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',

            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),

            entities: ['dist/**/*.entity.js'],

            migrationsTableName: 'migration',

            migrations: ['dist/migration/*.js'],

            cli: {
                migrationsDir: 'src/migration',
            },

            ssl: this.isProduction(),
        };
    }

    public getTypeOrmSeedConfig(): TypeOrmModuleOptions {
        return {
            name: 'seed',
            type: 'postgres',

            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),

            entities: ['dist/**/*.entity.js'],

            migrationsTableName: 'migration',

            migrations: ['dist/migration/seeds/*.js'],

            cli: {
                migrationsDir: 'src/migration/seeds',
            },

            ssl: this.isProduction(),
            logging: ['error', 'migration', 'warn'],
        };
    }

    public getRedisConfig(): RedisOptions {
        return {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            db: parseInt(process.env.REDIS_DB),
            password: process.env.REDIS_PASSWORD,
            keyPrefix: process.env.REDIS_PRIFIX,
            // sonarignore:start
            tls: !!parseInt(process.env.REDIS_TLS) as any,
            // sonarignore:end
        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
]);

export { configService };
