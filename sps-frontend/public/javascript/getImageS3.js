// GET IMAGES FROM S3 (Amazon) API
//https://medium.com/@hozacho/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EB%B0%94%EB%A1%9C-aws-s3%EC%97%90-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0-637dde104bcc

const albumBucketName = 'sps--bucket';
const bucketRegion = 'us-west-2';
const IdentityPoolId = 'us-west-2:c9123c64-387a-48b1-bf8f-78eccd3fd928'; // 이거 어디서 얻는지..


// SDK 구성
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: albumBucketName
  }
});

// 이미지 업로드
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "sps--bucket", // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
        acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

//버킷에 있는 앨범 목록 표시
// function listAlbums() {
//   s3.listObjects({
//     Delimiter: '/'
//   }, function (err, data) {
//     if (err) {
//       return alert('There was an error listing your albums: ' + err.message);
//     } else {
//       console.log('앨범', data.CommonPrefixes)
//       var albums = data.CommonPrefixes.map(function (commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace('/', ''));
//         return getHtml([
//           '<li>',
//           '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
//           '<span onclick="viewAlbum(\'' + albumName + '\')">',
//           albumName,
//           '</span>',
//           '</li>'
//         ]);
//       });
//       var message = albums.length ?
//         getHtml([
//           '<p>Click on an album name to view it.</p>',
//           '<p>Click on the X to delete the album.</p>'
//         ]) :
//         '<p>You do not have any albums. Please Create album.';
//       var htmlTemplate = [
//         '<h2>Albums</h2>',
//         message,
//         '<ul>',
//         getHtml(albums),
//         '</ul>',
//         '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
//         'Create New Album',
//         '</button>'
//       ]
//       document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//     }
//   });
// }

//버킷에서 앨범 생성
// function createAlbum(albumName) {
//   albumName = albumName.trim();
//   if (!albumName) {
//     return alert('Album names must contain at least one non-space character.');
//   }
//   if (albumName.indexOf('/') !== -1) {
//     return alert('Album names cannot contain slashes.');
//   }
//   var albumKey = encodeURIComponent(albumName) + '/';
//   s3.headObject({
//     Key: albumKey
//   }, function (err, data) {
//     if (!err) {
//       return alert('Album already exists.');
//     }
//     if (err.code !== 'NotFound') {
//       return alert('There was an error creating your album: ' + err.message);
//     }
//     s3.putObject({
//       Key: albumKey
//     }, function (err, data) {
//       if (err) {
//         return alert('There was an error creating your album: ' + err.message);
//       }
//       alert('Successfully created album.');
//       viewAlbum(albumName);
//     });
//   });
// }

//앨범 보기
// function viewAlbum(albumName) {
//   var albumPhotosKey = encodeURIComponent(albumName) + '//';
//   s3.listObjects({
//     Prefix: albumPhotosKey
//   }, function (err, data) {
//     if (err) {
//       return alert('There was an error viewing your album: ' + err.message);
//     }
//     // 'this' references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     var bucketUrl = href + albumBucketName + '/';
//     console.log('앨범', data.Contents)

//     var photos = data.Contents.map(function (photo) {
//       var photoKey = photo.Key;
//       var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//       return getHtml([
//         '<span>',
//         '<div>',
//         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//         '</div>',
//         '<div>',
//         '<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
//         'X',
//         '</span>',
//         '<span>',
//         photoKey.replace(albumPhotosKey, ''),
//         '</span>',
//         '</div>',
//         '</span>',
//       ]);
//     });
//     var message = photos.length ?
//       '<p>Click on the X to delete the photo</p>' :
//       '<p>You do not have any photos in this album. Please add photos.</p>';
//     var htmlTemplate = [
//       '<h2>',
//       'Album: ' + albumName,
//       '</h2>',
//       message,
//       '<div>',
//       getHtml(photos),
//       '</div>',
//       '<input id="photoupload" type="file" accept="image/*">',
//       '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
//       'Add Photo',
//       '</button>',
//       '<button onclick="listAlbums()">',
//       'Back To Albums',
//       '</button>',
//     ]
//     document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//   });
// }

//앨범에 사진 추가
// function addPhoto(albumName) {
//   var files = document.getElementById('photoupload').files;
//   if (!files.length) {
//     return alert('Please choose a file to upload first.');
//   }
//   var file = files[0];
//   var fileName = file.name;
//   var albumPhotosKey = encodeURIComponent(albumName) + '//';

//   var photoKey = albumPhotosKey + fileName;
//   s3.upload({
//     Key: photoKey,
//     Body: file,
//     ACL: 'public-read'
//   }, function (err, data) {
//     if (err) {
//       console.log(err)
//       return alert('There was an error uploading your photo: ', err.message);
//     }
//     alert('Successfully uploaded photo.');
//     viewAlbum(albumName);
//   });
// }





////////////////////////////////////// 필요시 사용 /////////////////////////////////
/*
// 사진 삭제
function deletePhoto(albumName, photoKey) {
  s3.deleteObject({
    Key: photoKey
  }, function (err, data) {
    if (err) {
      return alert('There was an error deleting your photo: ', err.message);
    }
    alert('Successfully deleted photo.');
    viewAlbum(albumName);
  });
}

// 앨범 삭제 
function deleteAlbum(albumName) {
  var albumKey = encodeURIComponent(albumName) + '/';
  s3.listObjects({
    Prefix: albumKey
  }, function (err, data) {
    if (err) {
      return alert('There was an error deleting your album: ', err.message);
    }
    var objects = data.Contents.map(function (object) {
      return {
        Key: object.Key
      };
    });
    s3.deleteObjects({
      Delete: {
        Objects: objects,
        Quiet: true
      }
    }, function (err, data) {
      if (err) {
        return alert('There was an error deleting your album: ', err.message);
      }
      alert('Successfully deleted album.');
      listAlbums();
    });
  });
}*/