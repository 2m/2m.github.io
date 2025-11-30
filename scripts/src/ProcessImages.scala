package images

@main def main() =
  val skipDirs = List("build", "node_modules", "/.")
  val imageExts = List("png", "jpg", "webp")

  val files = os
    .walk(
      os.pwd,
      skip = p => skipDirs.exists(d => p.toString.contains(d))
    )
  println(s"Found [${files.size}] files")

  val images = files.filter(p => imageExts.contains(p.ext))
  println(s"Found [${images.size}] images")

  val largeImages = images.filterNot(p => p.toString.contains(".small."))
  println(s"Found [${largeImages.size}] large images")

  println("Processing...")
  largeImages.foreach: p =>
      val newPath = p / os.up / s"${p.baseName}.small.${p.ext}"
      if !os.exists(newPath) then os.proc("magick", p, "-resize", "770x770", "-quality", "99", newPath).call()
