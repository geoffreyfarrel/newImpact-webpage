import mongoose from "mongoose";

export default {
  success(socket: any, event: string, data: any, message: string) {
    socket.emit(event, {
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },

  error(socket: any, event: string, error: unknown, message: string) {
    let errorData;
    if (error instanceof mongoose.Error) {
      errorData = {
        meta: {
          status: 500,
          message,
        },
        data: error.name,
      };
    }
    if ((error as any)?.code) {
      // Handle custom error objects with a `.code` property
      const _err = error as any;
      errorData = {
        meta: {
          status: 500,
          message: _err.errorResponse?.errmsg || "Unknown error occurred",
        },
        data: _err,
      };
    }
  },
};
