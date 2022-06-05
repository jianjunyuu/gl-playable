import { type ShaderSource, WebGLShader } from "./WebGLShader";

export interface WebGLProgramParameters {
  vertexSource: ShaderSource;
  fragmentSource: ShaderSource;
}
export class WebGLProgram {
  constructor(gl: WebGLRenderingContext, parameters: WebGLProgramParameters) {
    const { vertexSource, fragmentSource } = parameters;
    // 加载顶点着色器
    const vertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexSource);

    // 加载片段着色器
    const fragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    // 创建着色器程序
    const shaderProgram = gl.createProgram();

    if (!shaderProgram || !vertexShader || !fragmentShader) {
      return this;
    }

    // 添加预先存在的着色器
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 检查是否创建失败，失败则返回null
    const linkStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!linkStatus) {
      console.error(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
    }
  }
}
