import { DiseaseModel, IDiseaseType } from "../models";
import { PositiveLogsModel } from "../../positive-logs/model";

export const getOneService = async (id: string): Promise<IDiseaseType> => {
	const result = await DiseaseModel.findById(id);
	return result;
};

export const getManyService = async () => {
	
	const filteredData  = [];
	const date = new Date().toISOString().split('T')[0];
	const data = await DiseaseModel.find();

	for(let i = 0; i < data.length; i++) {
		let todayCount = 0;
		const countCase = await PositiveLogsModel.find({ disease: data[i].name });
        for(let x = 0; x < countCase.length; x++) {
			if(JSON.stringify(countCase[x].createdAt).split('T')[0].includes(date)) {
				todayCount += 1;
			}
		}
		filteredData.push({ 
			name: data[i].name, 
			isPriority: data[i].isPriority, 
			createdAt: data[i].createdAt,
            _id: data[i]._id, 
			totalMonitoredToday: todayCount, 
			totalTraceCount: countCase.length
		})
    }

	return filteredData;
};

export const getManyServiceFiltered = async () => {
	const data = await DiseaseModel.find();
	const newLoc = [];

	for(let i = 0; i < data.length; i++) {
		newLoc.push({ label: data[i].name, name: data[i].name})
	}
	return newLoc
};
