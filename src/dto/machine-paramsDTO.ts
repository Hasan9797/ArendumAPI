export interface CreateMachineParamsDTO {
	name: string;
	machineId: number;
	params: JSON;
}

export interface UpdateMachineParamsDTO {
	name?: string;
	machineId?: number;
	params?: JSON;
}
