import redisClient from '../config/redis';

export const saveSmsCode = async (
  phoneNumber: string,
  code: number,
  expiresIn: number
): Promise<void> => {
  const key = `sms:${phoneNumber}`;
  await redisClient.set(key, code, { EX: expiresIn }); // EX: TTL sekundlarda
};

export const sendSms = async (
  phoneNumber: string,
  code: string,
  mobileHash: string
) => {
  // Send SMS code to the provided phone number
};

export const getSmsCode = async (
  phoneNumber: string
): Promise<string | null> => {
  const key = `sms:${phoneNumber}`;
  return await redisClient.get(key); // SMS kodni qaytaradi yoki null
};

export const deleteSmsCode = async (phoneNumber: string): Promise<void> => {
  const key = `sms:${phoneNumber}`;
  await redisClient.del(key); // Redis'dan SMS kodni o'chirish
};
