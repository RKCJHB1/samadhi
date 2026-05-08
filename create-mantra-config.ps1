$json = @{
  gayatri = @{
    id = "gayatri"
    name = "Gayatri Mantra"
    audioSrc = "/audio/gayatri.mp3"
    syllables = @()
    transliteration = "Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt"
    transliterationSyllables = @("Oṃ ", "bhūr", "bhuvaḥ ", "svaḥ ", "tat", "sa", "vi", "tur", "va", "re", "ṇya", "bhar", "go ", "de", "va", "sya ", "dhī", "ma", "hi ", "dhi", "yo ", "yo ", "naḥ ", "pra", "cho", "da", "yāt")
    confirmed = $true
    lastModified = "2025-12-08T16:22:31.561Z"
  }
  "saha-navatu" = @{
    id = "saha-navatu"
    name = "Saha Nā Vavatu"
    audioSrc = "/audio/sahana.mp3"
    syllables = @()
    transliteration = "Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ"
    transliterationSyllables = @("Oṃ ", "sa", "ha ", "nā", "va", "va", "tu ", "sa", "ha ", "nau ", "bhu", "na", "ktu ", "sa", "ha ", "vī", "rya", "ṃ ", "ka", "ra", "vā", "va", "hai ", "te", "ja", "svi", "nā", "va", "dhī", "ta", "ma", "stu ", "mā ", "vi", "dvi", "ṣā", "va", "hai ", "oṃ ", "śān", "ti", "ḥ ", "śān", "ti", "ḥ ", "śān", "ti", "ḥ ")
    confirmed = $true
    lastModified = "2025-12-08T19:26:39.117Z"
  }
}
$json | ConvertTo-Json -Depth 10 | Out-File -FilePath public/data/mantra-configs.json -Encoding UTF8

