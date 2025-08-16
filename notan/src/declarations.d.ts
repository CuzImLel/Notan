// global.d.ts oder declarations.d.ts
declare module "*.css";
declare module "*.scss"; // falls du auch SCSS nutzt
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}
