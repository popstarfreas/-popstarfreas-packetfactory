type untypedT
type t
@new @module("@popstarfreas/packetfactory/dumbpacketwriter")
external make: NodeJs.Buffer.t => untypedT = "default"

@send external setType_: (untypedT, int) => t = "setType"
let setType = (untypedT, packetType) => setType_(untypedT, packetType)

@send external packByte: (t, int) => t = "packByte"
@send external packSByte: (t, int) => t = "packSByte"
@send external packBytes: (t, array<int>) => t = "packBytes"
@send external packUInt16: (t, int) => t = "packUInt16"
@send external packInt16: (t, int) => t = "packInt16"
@send external packUInt32: (t, int) => t = "packUInt32"
@send external packInt32: (t, int) => t = "packInt32"
@send external packUInt64: (t, NodeJs.BigInt.t) => t = "packUInt64"
@send external packInt64: (t, NodeJs.BigInt.t) => t = "packUInt64"
@send external packSingle: (t, float) => t = "packSingle"
@send external packString: (t, string) => t = "packString"
@send external packHex: (t, string) => t = "packHex"
@send external packBuffer: (t, NodeJs.Buffer.t) => t = "packBuffer"
@send external packNetworkText: (t, NetworkText.t) => t = "packNetworkText"
@send external packColor: (t, Color.t) => t = "packColor"
@get external packedLength: t => int = "packedLength"
@get external slicedData: t => NodeJs.Buffer.t = "slicedData"
