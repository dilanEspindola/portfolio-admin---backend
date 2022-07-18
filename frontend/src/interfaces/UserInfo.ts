export interface ProjectsDone {
	_id: string;
	projectName: string;
	description: string;
	image: string;
	pageUrl: string;
	gitHubUrl: string;
	userId?: string;
}

export interface UserData {
	_id: string;
	token: string;
	name: string;
	works: Array<ProjectsDone>;
}

export interface UserInfo {
	msg?: string;
	auth: boolean;
	token?: string;
	user?: UserData;
}
