import type { ApiPropertyOptions } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";

function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ""));
  if (!m) {
    throw new Error("The function does not contain a statement matching 'return variableName;'");
  }
  const fullMemberName = m[1];
  const memberParts = fullMemberName.split(".");
  return memberParts[memberParts.length - 1];
}

export function ApiBooleanProperty(options: ApiPropertyOptions): PropertyDecorator {
  options.type = Boolean;
  return ApiProperty(options);
}

export function ApiUUIDProperty(options: ApiPropertyOptions & Partial<{ each: boolean }> = {}): PropertyDecorator {
  options.type = options?.each ? [String] : String;
  options.format = "uuid";
  options.isArray = options?.each;
  return ApiProperty(options);
}

export function ApiEnumProperty<TEnum>(
  getEnum: () => TEnum,
  options: ApiPropertyOptions & { each?: boolean } = {}
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enumValue = getEnum() as any;

  return ApiProperty({
    ...options,
    isArray: options.each,
    enum: enumValue,
    enumName: getVariableName(getEnum)
  });
}
