type t
@bs.new @bs.module("@popstarfreas/packetfactory/packetreader") external make: NodeJs.Buffer.t => t = "default"
@bs.send external readByte: t => int = "readByte"
@bs.send external readBytes: t => array<int> = "readBytes"
@bs.send external readBuffer: t => NodeJs.Buffer.t = "readBuffer"
@bs.send external readColor: t => Color.t = "readColor"
@bs.send external readSByte: t => int = "readSByte"
@bs.send external readInt16: t => int = "readInt16"
@bs.send external readUInt16: t => int = "readUInt16"
@bs.send external readInt32: t => int = "readInt32"
@bs.send external readUInt32: t => int = "readUInt32"
@bs.send external readUInt64: t => float = "readUInt64"
@bs.send external readSingle: t => float = "readSingle"
@bs.send external readString: t => string = "readString"
@bs.send external readNetworkText: t => NetworkText.t = "readNetworkText"
