// This packet writer automatically allocates a buffer
type untypedT
type t
@bs.new @bs.module("@popstarfreas/packetfactory/packetwriter") external make: unit => untypedT = "default"

@bs.send external setType_: untypedT => int => t = "setType"
let setType = (untypedT, packetType) => setType_(untypedT, packetType)

@bs.send external packByte: t => int => t = "packByte"
@bs.send external packSByte: t => int => t = "packSByte"
@bs.send external packBytes: t => array<int> => t = "packBytes"
@bs.send external packUInt16: t => int => t = "packUInt16"
@bs.send external packInt16: t => int => t = "packInt16"
@bs.send external packUInt32: t => int => t = "packUInt32"
@bs.send external packInt32: t => int => t = "packInt32"
@bs.send external packUInt64: t => NodeJs.BigInt.t => t = "packUInt64"
@bs.send external packInt64: t => NodeJs.BigInt.t => t = "packInt64"
@bs.send external packSingle: t => float => t = "packSingle"
@bs.send external packString: t => string => t = "packString"
@bs.send external packHex: t => string => t = "packHex"
@bs.send external packBuffer: t => NodeJs.Buffer.t => t = "packBuffer"
@bs.send external packNetworkText: t => NetworkText.t => t = "packNetworkText"
@bs.send external packColor: t => Color.t => t = "packColor"
@bs.get external data: t => NodeJs.Buffer.t = "data"
