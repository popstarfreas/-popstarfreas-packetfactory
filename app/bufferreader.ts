import Color from "./color";
import NetworkText from "./networktext";
import { bufferToText } from "./utils";
import * as utf8 from "utf8";

/**
 * Reads datatypes from a hex string
 */
class BufferReader {
    protected _data: Buffer;
    public head: number = 0;

    constructor(data: Buffer) {
        this._data = data;
    }

    /**
     * Gets the data still stored by the reader
     *
     * @return The hex data still stored by the reader
     */
    public get data() {
        return this._data;
    }

    public set buffer(data: Buffer) {
        this._data = data;
        this.head = 0;
    }

    /**
     * Reads a byte from the data
     *
     * @return The byte removed
     */
    public readByte(): number {
        const byte = this._data.readUInt8(this.head);
        this.head += 1;

        return byte;
    }

    /**
     * Reads a certain number of bytes from the data
     *
     * @return The bytes removed
     */
    public readBytes(amount: number): number[] {
        const bytes: number[] = [];
        for (let i = 0; i < amount; i++) {
            bytes.push(this.readByte());
        }

        return bytes;
    }

    /**
     * Reads a chunk of data and returns it in a buffer
     *
     * @param size The number of bytes to read
     */
    public readBuffer(size: number): Buffer {
        const buffer = this._data.slice(this.head, this.head + size);
        this.head += size;
        return buffer;
    }

    /**
     * Reads three bytes from the data and puts them into a color object
     *
     * @return The color object {R, G, B}
     */
    public readColor(): Color {
        const color = {
            R: this.readByte(),
            G: this.readByte(),
            B: this.readByte()
        };

        return color;
    }

    /**
     * Reads a byte and converts it into an sbyte
     *
     * @return The sbyte removed
     */
    public readSByte(): number {
        const byte = this._data.readInt8(this.head);
        this.head += 1;

        return byte;
    }

    /**
     * Reads 2 bytes from the data, converting it to a signed int16
     * as an int16.
     *
     * @return An int16
     */
    public readInt16(): number {
        const int16 = this._data.readInt16LE(this.head);
        this.head += 2;

        return int16;
    }

    /**
     * Reads 2 bytes from the data and converts it to an unsigned int16
     *
     * @return A uint16
     */
    public readUInt16(): number {
        const uint16 = this._data.readUInt16LE(this.head);
        this.head += 2;

        return uint16;
    }

    /**
     * Reads 4 bytes from the data, converting it into a signed int32
     *
     * Perf: https://jsperf.com/conv-dimen-1
     * @return The signed int32 removed from the data
     */
    public readInt32(): number {
        const int32 = this._data.readInt32LE(this.head);
        this.head += 4;

        return int32;
    }

    /**
     * Reads 4 bytes from the data, converting it into an unsigned int32
     *
     * @return The unsigned int32 removed from the data
     */
    public readUInt32(): number {
        const uint32 = this._data.readUInt32LE(this.head);
        this.head += 4;

        return uint32;
    }

    /**
     * Reads 8 bytes from the data, converting it into an unsigned int64
     *
     * @return The unsigned int64 removed from the data
     */
    public readUInt64(): bigint {
        const uint64 = this._data.readBigUInt64LE(this.head);
        this.head += 8;

        return uint64;
    }

    /**
     * Reads 8 bytes from the data, converting it into an unsigned int64
     *
     * @return The unsigned int64 removed from the data
     */
    public readInt64(): bigint {
        const int64 = this._data.readBigInt64LE(this.head);
        this.head += 8;

        return int64;
    }

    /**
     * Alias for readFloat()
     *
     * @return The single removed from the data
     */
    public readSingle(): number {
        const single = this._data.readFloatLE(this.head);
        this.head += 4;

        return single;
    }

    /**
     * Reads 8 bytes from the data converting it into a double
     *
     * @return The double removed from the data
     */
    public readDouble(): number {
        const double = this._data.readDoubleLE(this.head);
        this.head += 8;

        return double;
    }

    /**
     * Reads a certain number of bytes for the string length, and then further
     * bytes depending on the length, converting it into a string of characters.
     *
     * @return The string removed from the data
     */
    public readString(): string {
        // Read string length
        const firstByte: number = this.readByte();
        let strLength: number = firstByte;
        if (firstByte >= 128) {
            const secondByte: number = this.readByte();
            strLength = (firstByte - 128) + (secondByte << 7);
        }

        // Read string content using length
        const rawText = bufferToText(this._data.slice(this.head, this.head + strLength));
        const strContent: string = utf8.decode(rawText);
        this.head += strLength;
        return strContent;
    }

    /**
     * Reads the mode byte and the string bytes
     *
     * @return The text
     */
    public readNetworkText(): NetworkText {
        const mode = this.readByte();
        const text = this.readString();

        return new NetworkText(mode, text);
    }
}

export default BufferReader;
