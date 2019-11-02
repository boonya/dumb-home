export default (state = {}) => state;

export const getConfig = ({ config }) => config;

export const getAppPrefix = ({ config }) => config.appPrefix;

export const getTitle = ({ config }) => config.title;
