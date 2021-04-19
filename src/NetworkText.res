type t

@bs.get external mode: t => int = "mode"
@bs.get external text: t => string = "text"
@bs.send external toString: t => string = "toString"
@bs.new @bs.module("@popstarfreas/packetfactory/networktext") external make: (int, string) => t = "default"
