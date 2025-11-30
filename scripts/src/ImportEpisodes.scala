package episodes

val Pocketcasts = "https://api.pocketcasts.com"

case class LoginResponse(accessToken: String) derives upickle.ReadWriter

case class Episode(
    uuid: String,
    published: String,
    title: String,
    slug: String,
    podcastUuid: String,
    podcastTitle: String,
    podcastSlug: String,
    author: String
) derives upickle.ReadWriter
case class StarredResponse(total: Int, episodes: Seq[Episode]) derives upickle.ReadWriter

def episodeTemplate(e: Episode) = s"""
---
title: ${e.title}
date: ${e.published}
---

<div style={{ display: 'grid', gridTemplateColumns: '12ch auto', gridColumnGap: '0.5rem' }}>

![image](https://static.pocketcasts.com/discover/images/webp/200/${e.podcastUuid}.webp)

<div>
    <p>
        [${e.title}](https://pocketcasts.com/podcast/${e.podcastSlug}/${e.podcastUuid}/${e.slug}/${e.uuid})
    </p>
    <p>${e.podcastTitle} @ ${e.author}</p>
</div>

</div>

"""

@main def main(email: String, password: String) =
  val loginResponse = requests.post(
    s"$Pocketcasts/user/login_pocket_casts",
    data = ujson.Obj("email" -> email, "password" -> password, "scope" -> "webplayer")
  )
  val login = upickle.read[LoginResponse](loginResponse.text())

  val starredResponse =
    requests.post(s"$Pocketcasts/user/starred", auth = requests.RequestAuth.Bearer(login.accessToken))
  val starred = upickle.read[StarredResponse](starredResponse.text())

  starred.episodes.foreach: episode =>
    os.write(os.pwd/"episodes"/episode.slug, episodeTemplate(episode))
