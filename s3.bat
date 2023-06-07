aws s3 cp ./index.html s3://misc.keyri.com/index.html --profile default

aws s3 cp ./delete_outer_test.html s3://misc.keyri.com/delete_outer_test.html --profile default

aws s3 cp ./voo.doo.min.mjs s3://misc.keyri.com/voo.doo.min.mjs --profile default

aws cloudfront create-invalidation --distribution-id E40QWJD6HFBR2 --paths "/*" --profile default