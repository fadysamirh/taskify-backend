import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
	private readonly saltRounds = 10; // Adjust the salt rounds as necessary

	public async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

	public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
