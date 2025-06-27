import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds: number = 10): Promise<any> => {
    return await bcrypt.hash(value, saltRounds);
};

export const compareValue = async(value: string, hashedValue: string): Promise<any> => {
    return await bcrypt.compare(value, hashedValue)
};