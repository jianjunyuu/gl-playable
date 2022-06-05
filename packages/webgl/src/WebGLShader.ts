import type { ValueOf } from "type-fest";

export type ShaderSource = string;

export function WebGLShader(
  gl: WebGLRenderingContext,
  type: ValueOf<
    Pick<WebGLRenderingContext, "VERTEX_SHADER" | "FRAGMENT_SHADER">
  >,
  source: ShaderSource
) {
  // 创建着色器
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }
  // 将源代码发送到着色器
  gl.shaderSource(shader, source);

  // 编译
  gl.compileShader(shader);

  // 检查是否成功编译了着色器
  const compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compileStatus) {
    console.error(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    return null;
  }

  // 成功编译，则返回编译的着色器
  return shader;
}
