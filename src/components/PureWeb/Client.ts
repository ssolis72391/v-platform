const clientConfig = {
	projectId: 'fe1e52e8-5ee9-41c6-b019-b8dc396a44c4',
	modelId: '7149d66e-1733-4625-8364-a5b69af986fd',
	version: 'x7nxj2',
	usePointerLock: false,
	pointerLockRelease: false
};

const client: ClientJson = clientConfig as ClientJson;

class ClientJson {
	environmentId?: string;
	launchType?: string;
	projectId?: string;
	modelId?: string;
	version?: string;
	endpoint?: string;
	usePointerLock?: boolean;
	pointerLockRelease?: boolean;
	useNativeTouchEvents?: boolean;
}

class ClientOptions {
	// Overridable connection options
	LaunchType?: string;

	// Launch queue configuration
	ProjectId?: string;
	ModelId?: string;
	Version?: string;
	EnvironmentId?: string;
	Endpoint?: string;

	// Overridable streamer options
	ForceRelay = false;
	UseNativeTouchEvents?: boolean;
	UsePointerLock?: boolean;
	PointerLockRelease?: boolean;

	isValid(): boolean {
		if (!this.ProjectId) {
			return false;
		}
		if (!this.ModelId) {
			return false;
		}
		return true;
	}
}

const clientOptions: ClientOptions = new ClientOptions();
clientOptions.LaunchType = client.launchType;
clientOptions.Endpoint = client.endpoint;
clientOptions.ProjectId = client.projectId;
clientOptions.ModelId = client.modelId;
clientOptions.Version = client.version;
clientOptions.EnvironmentId = client.environmentId;

clientOptions.UsePointerLock = client.usePointerLock;
clientOptions.PointerLockRelease = client.pointerLockRelease;
clientOptions.UseNativeTouchEvents = client.useNativeTouchEvents;

export { clientOptions };
