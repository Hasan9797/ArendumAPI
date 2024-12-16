import prisma from '@/shared/config/prisma';
type User = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export const getAllUsers = async (): Promise<User[] | []> => {
	return await prisma.user.findMany();
};

export const createUser = async (newUser: User): Promise<User | null> => {
	return await prisma.user.create({
		data: newUser,
	});
};

export const getUser = async (id: number): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

export const deleteUserById = async (id: number) => {
	return await prisma.user.delete({
		where: { id },
	});
};

export const updateUserById = async (
	id: number,
	userData: Partial<Omit<User, 'created_at' | 'updated_at'>>
): Promise<User | null> => {
	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: userData,
		});
		return updatedUser;
	} catch (error) {
		console.error('Error updating user:', error);
		return null; // Xato yuz berganida null qaytarish
	}
};
