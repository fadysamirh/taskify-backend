import {ClassConstructor, ClassTransformOptions, plainToInstance} from 'class-transformer';

export function Mapper<T, V>(cls: ClassConstructor<T>, plain: V, options?: ClassTransformOptions): T {
	if (!options) {
		options = {};
	}
	return plainToInstance(cls, plain, {excludeExtraneousValues: true, ...options});
}

export function ListMapper<T, V>(cls: ClassConstructor<T>, plain: V[], options?: ClassTransformOptions): T[] {
	if (!options) {
		options = {};
	}
	return plainToInstance(cls, plain, {excludeExtraneousValues: true, ...options});
}
