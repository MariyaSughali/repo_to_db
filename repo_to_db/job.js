const { CronJob } = require("cron");
const AWS = require("aws-sdk");
const pool = require("./config/db");

const s3 = new AWS.S3({
  accessKeyId: "AKIAWJUYWBOYM2OA5BTO",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "ap-south-1",
  endpoint: "s3.ap-south-1.amazonaws.com",
});
const bucketName = "pdffileupload";

const job = new CronJob(
  "0 * * * * *",
  function () {
    console.log("You will see this message every one minute");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDateTime = `${year}-${month}-${day}`;

    const listS3Files = () => {
      const params = {
        Bucket: bucketName,
      };

      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.error("Error listing objects:", err);
        } else {
          data.Contents.forEach((object) => {
            const fileName = object.Key;
            const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
            console.log("File Name:", fileName);
            console.log("File URL:", fileUrl);

            pool.query(
              "SELECT * FROM inbox WHERE file_name = $1",
              [fileName],
              (err, res) => {
                if (res.rowCount === 0) {
                  pool.query(
                    "INSERT INTO inbox (file_name, file_url,assigned_date) VALUES ($1, $2,$3)",
                    [fileName, fileUrl, formattedDateTime]
                  );
                }
              }
            );
          });
        }
      });
    };

    listS3Files();
  },
  null,
  true
);

job.start();
