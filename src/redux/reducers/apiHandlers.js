export const handleFetchAction = (state) => {
    if (state.status === "void") {
        state.status = "pending";
    }
    if (state.status === "rejected") {
        state.error = null;
        state.status = "pending";
    }
    if (state.status === "resolved") {
        state.status = "updating";
    }
    state.isLoading = true;
};

export const handleResolveAction = (state, action, { name }) => {
    if (state.status === "pending" || state.status === "updating") {
        state[name] = action.payload; 
        state.status = "resolved";
    }
    state.isLoading = false;
};

export const handleRejectedAction = (state, action, { name }) => {
    if (state.status === "pending" || state.status === "updating") {
        state.status = "rejected";
        state.error = action.payload;
        state[name] = action.payload;
    }
    state.isLoading = false;
};

export const handleResetAction = (state, { name }) => {
    state[name] = null;
    state.status = "void";
};
