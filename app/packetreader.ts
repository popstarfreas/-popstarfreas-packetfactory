import BufferReader from './bufferreader';

/**
 * Takes out the type and packet length from packet and acts the same as a HexReader
 */
class PacketReader extends BufferReader {
    protected _type: number;

    constructor(data: Buffer) {
        // Store data after length and type
        super(data);
        this.readUInt16();
        this._type = this.readByte();
    }

    /**
     * Gets the packet type
     * 
     * @return The packet type of the packet
     */
    public get type(): number {
        return this._type;
    }
}

export default PacketReader;
