// import nodegit from "nodegit"

const nodegit = require("nodegit")

/*
interface IGitInfo {
  status: string[],
  shorthand: string,
  target: string,
}

const gitInfo: IGitInfo = {} as IGitInfo

const gitInfoPromise: Promise<IGitInfo> = nodegit.Repository.open(".").then((repo: any) => {
  const gitStatusDeferred: Promise<IGitInfo> = new Promise((resolve, reject) => {
  */

const gitInfo = {}

const gitInfoPromise = nodegit.Repository.open(".").then((repo) => {
  const gitStatusDeferred = new Promise((resolve, reject) => {
    repo.getStatus().then((statuses) => {
      const st = []

      function statusToText(status) {
        const words = []
        if (status.isNew()) {
          words.push("NEW")
        }
        if (status.isModified()) {
          words.push("MODIFIED")
        }
        if (status.isTypechange()) {
          words.push("TYPECHANGE")
        }
        if (status.isRenamed()) {
          words.push("RENAMED")
        }
        if (status.isIgnored()) {
          words.push("IGNORED")
        }

        return words.join(" ")
      }

      statuses.forEach((file) => {
        // console.log(file.path() + " " + statusToText(file))
        st.push(`${file.path()} ${statusToText(file)}`)
      })

      gitInfo.status = st
      resolve(gitInfo)
    }).catch((err) => {
      console.log("nodegit status failed: ", err)
      reject(err)
    })
  })

  const gitRefDeferreed = new Promise((resolve, reject) => {
    repo.getCurrentBranch().then((ref) => {
      gitInfo.shorthand = ref.shorthand()
      gitInfo.target = ref.target().toString()
      resolve(gitInfo)
    }).catch((err) => {
      console.log("nodegit ref failed: ", err)
      reject(err)
    })
  })
  return Promise.all([gitStatusDeferred, gitRefDeferreed])
})

// export default gitInfoPromise
module.exports = gitInfoPromise
