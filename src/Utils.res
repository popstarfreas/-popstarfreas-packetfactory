type packet = {
    packetType: int,
    data: NodeJs.Buffer.t,
}

type getPacketsResult = {
    bufferPacket: NodeJs.Buffer.t,
    packets: array<packet>,
}

@bs.new @bs.module("@popstarfreas/packetfactory/utils") external getPacketsFromBuffer: NodeJs.Buffer.t => packet = "getPacketsFromBuffer"
