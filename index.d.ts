/** Bitser Serializable Data Type */
type Serializable<T> = Exclude<T, Function | LuaThread | LuaUserdata> | Serializable<T>[] | {[index: string]: Serializable<T>}

/** @noResolution */
declare module "bitser" {
    /**
     * bitser
     * @description Serializes and deserializes Lua values with LuaJIT
     * @link https://github.com/gvx/bitser
     * @version 1.1
     * @author gvx
     */
    namespace bitser {
        /**
         * Basic serialization of `value` into a Lua string
         * @param value Data Value, could be anything except function, thread, and userdata (recursively)
         * @noSelf
         */
        function dumps<ValueType>(value: Serializable<ValueType>): string

        /**
         * Serializes `value` and writes the result to `filename` (Only works in LÖVE)
         * @param filename Filename or path to file to output
         * @param value Data Value, could be anything except function, thread, and userdata (recursively)
         * @noSelf
         */
        function dumpLoveFile<ValueType>(filename: string, value: Serializable<ValueType>): void

        /**
         * Deserializes `value` from `date`
         * @param data Data to deserialize
         * @noSelf
         */
        function loads(data: string): unknown

        /**
         * Deserializes `value` from raw `data_obj` (Only works in LÖVE)
         * @param data_obj LÖVE `Data` Subclass
         * @param size Size to read, usually `data_obj.getSize()`
         * @see https://love2d.org/wiki/Data
         * @noSelf
         */
        function loadData(data_obj: import("love.data").Data, size: number): unknown

        /**
         * Reads from `filename` and deserializes `value` (Only works in LÖVE)
         * @param filename Filename or path to file to read
         * @noSelf
         */
        function loadLoveFile(filename: string): unknown

        /**
         * Controls whether bitser will (de)serialize metatables
         * @param enabled Enable metatable (de)serialization
         * @default true
         * @noSelf
         */
        function includeMetatables(enabled: boolean): void

        /**
         * Registers the `resource` with the `name`, this can make sure bitser doesn't attempt to serialize them, but only stores a named reference to them
         * @param name Unique ID or Name of this resource
         * @param resource Resource to register, usually something cannot or too huge to be (de)serialized
         * @returns Registered `resource`
         * @noSelf
         */
        function register<ResourceType>(name: string, resource: ResourceType): ResourceType

        /**
         * Registers the class, so that bitser can correctly serialize and deserialize instances of class
         * @param the_class Class to register, must be some sort of **supported** class implementation has **unique name** stored in the class **object itself**.
         *                  Otherwise you need to try other overloads of this function
         * @returns Registered `the_class`
         * @see https://github.com/gvx/bitser/blob/master/USAGE.md#supported-class-libraries
         * @noSelf
         */
        function registerClass<ClassType>(the_class: ClassType): ClassType
        /**
         * Registers `the_class`, so that bitser can correctly serialize and deserialize instances of `the_class`
         * @param name Unique ID or Name of this class
         * @param the_class Class to register, might be some sort of **supported** class implementation but does **not** have **unique name** stored in the class **object itself**
         * @returns Registered `the_class`
         * @see https://github.com/gvx/bitser/blob/master/USAGE.md#supported-class-libraries
         * @noSelf
         */
        function registerClass<ClassType>(name: string, the_class: ClassType): ClassType
        /**
         * Registers `the_class`, so that bitser can correctly serialize and deserialize instances of `the_class`
         * @param name Unique ID or Name of this class
         * @param the_class Class to register, might be some sort **unsupported** of class implementation
         * @param classkey Should be a string such that `rawget(obj, classkey) == class` for any `obj` whose type is `the_class` to skip it for serialization
         * @param deserializer Should be a function such that `deserializer(obj, class)` returns a valid instance of `the_class` with the properties of `obj`.
         *                     deserializer is allowed to mutate obj
         * @returns Registered `the_class`
         * @see https://github.com/gvx/bitser/blob/master/USAGE.md#supported-class-libraries
         * @noSelf
         */
        function registerClass<ClassType>(
            name: string,
            the_class: ClassType,
            classkey: keyof ClassType,
            deserializer: <ObjectType>(this: void, obj: Serializable<ObjectType>, the_class: ClassType) => ClassType & ObjectType
        ): ClassType

        /**
         * Unregister the previously registered resource with the `name`
         * @param name Unique ID or Name of the resource
         * @noSelf
         */
        function unregister(name: string): void

        /**
         * Unregister the previously registered class with the `name`
         * @param name Unique ID or Name of the class
         * @noSelf
         */
        function unregisterClass(name: string): void

        /**
         * Set the buffer used for reading and writing serialized data to at least `bytes` large
         * @param bytes Buffer Size in bytes
         * @noSelf
         */
        function reserveBuffer(bytes: number): void

        /**
         * Free the buffer used for reading and writing serialized data for garbage collection
         * @description You'll rarely need to use this function, except if you needed a huge buffer before and now only need a small buffer.
         *              Most of the time, using this function will decrease performance needlessly.
         * @noSelf
         */
        function clearBuffer(): void
    }

    export = bitser
}
