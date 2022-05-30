import { ThothError } from "@thothom/core";

export const handleDatabaseError = (err: any) => {
	const message = err.message;

	switch (true) {
		case err instanceof ThothError:
			return err;
		default:
			return new ThothError({
				code: "UNKNOWN",
				origin: "DATABASE",
				message: "Unknown error",
				details: [message],
			});
	}
};
