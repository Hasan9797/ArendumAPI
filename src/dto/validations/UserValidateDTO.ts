import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@Length(3, 20)
	fullName!: string;

	@IsPhoneNumber('UZ', {
		message: 'Invalid phone number. Must be a valid Uzbekistan phone number.',
	})
	phone!: string;

	@IsString()
	@Length(5, 20)
	login!: string;

	@IsString()
	@Length(5, 30)
	password!: string;
}

export class UpdateUserDto {
	@IsString()
	@Length(3, 20)
	fullName!: string;

	@IsPhoneNumber('UZ', {
		message: 'Invalid phone number. Must be a valid Uzbekistan phone number.',
	})
	phone!: string;

	@IsString()
	@Length(5, 30)
	password?: string;
}
