function createSharedUrl() {
  //アクティブなシートを取得する
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  
  //変数folderに指定したフォルダーを格納する
  //★★★ フォルダーIDを記入 ★★★
  var folder = DriveApp.getFolderById("YOUR GDRIVE FOLDER ID");
  
  //フォルダー内の全ファイルを変数folderFilesに格納する
  //変数folderFiles格納されるデータはイテレーターという形式
  //※フォルダー直下のファイルのみ格納する
  var folderFiles = folder.getFiles();
  
  //ファイル名を格納するための空の配列を宣言する
  var allFiles = [];
  
  //変数folderFilesに格納されている全ファイルのファイル名と
  //共有リンクを配列allFilesに二次元配列で格納する
  while(folderFiles.hasNext()) {
    //配列allFilesに追加する配列(ファイル名と共有リンク)を
    //ループ中に一時的に格納するための空の配列tempFileを宣言する
    var tempFile = [];
    
    //変数folderFilesからファイルのイテレーターをひとつ取り出し
    //変数fileIteratorに格納する
    var fileIterator = folderFiles.next();
    
    //ファイル名を取得する
    var fileName = fileIterator.getName();
    
    //ファイルIDを取得し、ファイルIDをもとにファイルを
    //指定し変数fileに格納する
    var fileId = fileIterator.getId();
    var file = DriveApp.getFileById(fileId);
    
    //変数fileの共有設定を「リンクを知っている全員が閲覧化」に変更する
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    //共有リンクを変数shareUrlに格納する
    var shareUrl = file.getUrl();
    
    //配列tempFileにファイル名と共有リンクを格納する
    //この時点で配列tempFileは以下のようになっている
    //tempFile = [ファイル名, 共有リンク]
    tempFile.push(fileName);
    tempFile.push(shareUrl);
    
    //配列tempFileを配列allFilesに格納する
    //配列の中に配列を入れるのでallFilesは
    //以下のような二次元配列になる
    //allFiles = [[ファイル名1, 共有リンク1],[ファイル名2,共有リンク2],....]
    allFiles.push(tempFile);  
  }
    
  //配列allFiles内の要素数、つまり必要な行数を確認する
  var numRow = allFiles.length;
  
  //配列allFiles内の一つ目レコードの要素数、つまり必要な列数を確認する
  //今回はレコードの要素は「ファイル名」と「共有リンク」なので2になる
  var numCol = allFiles[0].length;
  
  //アクティブなシートの2行目にペースト
  sh.getRange(2,1, numRow, numCol).setValues(allFiles);
}
