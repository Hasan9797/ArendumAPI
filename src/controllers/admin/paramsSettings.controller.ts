import machinParamsService from "@/services/machin-params.service";
import { Request, Response } from "express";

const filtersParams = async (req: Request, res: Response): Promise<void> => {
	try {
		const machinId: number = parseInt(req.params.id);

		const machineParams = await machinParamsService.filtersMachineParams(machinId);
		res.status(200).json(machineParams);
	} catch (error) {
		res.status(500).json({
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'Failed to fetch machine params',
		});
	}
}

export default {
    filtersParams,
};