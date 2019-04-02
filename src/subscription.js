import { PubSub } from 'apollo-server';

export const pubSub = new PubSub();

export const USER_ADDED = 'USER_ADDED';
export const NEW_MESSAGE = 'NEW_MESSAGE'
