import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const BASE_URL = PUBLIC_API_BASE_URL;

// User authentication routes
export const USER_URL = `${BASE_URL}/users/me`;
export const AUTH_URL = `${BASE_URL}/auth`;
export const SIGNUP_URL = `${BASE_URL}/signup`;
export const USERPROFILE_URL = `${BASE_URL}/userprofile`;

// Articles and posts
export const ARTICLE_URL = `${BASE_URL}/articles`;
export const POST_URL = `${BASE_URL}/articles/article`;
export const GETARTICLE_URL = `${BASE_URL}/articles/link`;
export const PATCH_URL = `${BASE_URL}/articles`;

// Recipes
export const RECIPES_URL = `${BASE_URL}/recipes`;

// Likes and comments
export const COMMENT_URL = `${BASE_URL}/comments`;
export const LIKE_URL = `${BASE_URL}/likes`;

// Messaging
export const MESSAGE_URL = `${BASE_URL}/messages`;


// For testing
console.log("Base API URL:", BASE_URL);
console.log("POST_URL:", POST_URL);