import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { YoudaoV2, YoudaoTranslateResult } from "@/types/translate"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = await fetch(
    `http://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=${req.body.text}`,
    {
      method: "GET"
    }
  )
    .then((res) => res.json())
    .catch((err) => res.send({ error: err }))

  console.log("youdao result", result)

  if (isTranslate(result)) {
    res.send({
      translate: result.fanyi.tran
    })
    return
  }

  const data = result.ec as YoudaoV2

  const rawExampleSentence = result.blng_sents_part as {
    "sentence-pair": {
      sentence: string
      sentence_translation: string
      source: string
    }[]
  }

  const word = data.word[0]

  res.send({
    phonetic: {
      uk: word.ukphone,
      us: word.usphone
    },
    trs:
      word.trs?.map((item) => {
        const translationStr = item.tr[0].l.i[0]
        if (translationStr.includes("【名】")) {
          return {
            partOfSpeech: "名",
            export: translationStr.split("【名】")[1]
          }
        } else {
          return {
            partOfSpeech: translationStr.split(".")[0],
            explain: translationStr.split(".")[1]
          }
        }
      }) || [],
    forms:
      word.wfs?.map((item) => {
        return {
          name: item.wf.name,
          value: item.wf.value
        }
      }) || [],
    examTags: data.exam_type || [],
    exampleSentences:
      rawExampleSentence?.["sentence-pair"]?.map((item) => {
        return {
          sentence: item.sentence,
          translation: item.sentence_translation,
          source: item.source
        }
      }) || []
  })
}

export default handler

function isTranslate(data: any): data is YoudaoTranslateResult {
  return !!data.fanyi
}
