$(function () {
  /////// Start position////////////
  let arr = $(".window1 .box");
  let arrNew = [];
  for (let i = 0; i < arr.length; i++) {
    arrNew.push([arr[i].innerHTML]);
  }
  let arrStart = [];
  for (let i = 0; i < arr.length; i++) {
    arrStart.push([arr[i].innerHTML]);
  }
  function startPicture() {
    let arrEnd = $(".window1 .box");
    for (let i = 0; i < arr.length; i++) {
      arrEnd[i].innerHTML = arrStart[i];
    }
  }
  shuffle(arr);
  ///////////////////

  //// ----- shake -----
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function shake() {
    shuffle(arrNew);
    let arrEnd = $(".window1 .box");
    for (let i = 0; i < arr.length; i++) {
      arrEnd[i].innerHTML = arrNew[i];
    }
  }

  ////////////

  //      ---- Timer ----

  let min = 0;
  let sec = 60;
  let tt;
  function timer() {
    tt = setInterval(function () {
      sec--;
      let min2 = min;
      let sec2 = sec;
      if (min2 < 10) {
        min2 = "0" + min2;
      }
      if (sec2 < 10) {
        sec2 = "0" + sec2;
      }
      $(".tth").text(`${min2}:${sec2}`);
      $(".timeAlert").text(`${min2}:${sec2}`);
      if (sec == 0) {
        $(".tth").text(`${min2}:${sec2}`);
        $(".timeAlert").text(`${min2}:${sec2}`);
        clearInterval(tt);
        checkFunction();
        sec = 60;
      }
    }, 1000);
  }
  ////////////////////
  $(".box").sortable({
    connectWith: ".box",
    containment: ".second-block",
  });

  //  -----------   checkFunction   --------------
  function checkFunction() {
    let a = $(".window2 .box ");
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i].firstElementChild == null) {
        console.log("need picture");
        $(".wordAlerth3").text(`It's a pity, but you lost`);
        $(".mainAlert").css({
          display: "none",
        });
        $(".Mright0").css({
          backgroundColor: "red",
        });
        $(".message").css({
          display: "block",
        });
        $(".check").attr({
          disabled: true,
        });
        clearInterval(tt);
        sec = 60;
        return;
      }
      if (a[i].firstElementChild.dataset.id == num[i]) {
        count++;
      } else if (a[i].firstElementChild.dataset.id != num[i]) {
        console.log("lost");
        $(".wordAlerth3").text(`It's a pity, but you lost`);
        $(".mainAlert").css({
          display: "none",
        });
        $(".message").css({
          display: "block",
        });
        $(".Mright0").css({
          backgroundColor: "red",
        });
        $(".check").attr({
          disabled: true,
        });
        clearInterval(tt);
        sec = 60;
        return;
      }
    }
    if (count == 9) {
      console.log("you win");
      $(".wordAlerth3").text(`Woohoo, well done, you did it`);
      $(".mainAlert").css({
        display: "none",
      });
      $(".message").css({
        display: "block",
      });
      $(".Mright0").css({
        backgroundColor: "lightgreen",
      });
      $(".check").attr({
        disabled: true,
      });

      clearInterval(tt);
      sec = 60;
    }
    count = 0;
  }

  // --------  Check Button --------
  $(".check").on("click", function () {
    $(".mainAlert").css({
      display: "block",
    });
  });
  // // --------  Check ALERT --------
  $(".CheckAlert").on("click", function () {
    checkFunction();
  });
  // -------------  Close Alert  ---------
  $(".CloseAlert").click(function () {
    $(".mainAlert").css({
      display: "none",
    });
  });
  //      Close word Alert win or lost
  $(".Mright0").click(function () {
    $(".message").css({
      display: "none",
    });
    $(".block").css({
      display: "block",
    });
  });
  // ----------  Start  -------------
  $(".start").on("click", function () {
    $(".start").attr({
      disabled: true,
    });
    $(".block").css({
      display: "none",
    });
    $(".check").attr({
      disabled: false,
    });
    timer();
    shake();
  });

  // ----------- New game ----------
  $(".refresh").on("click", function () {
    $(".window2 .box").empty();
    clearInterval(tt);
    $(".start").attr({
      disabled: false,
    });
    $(".block").css({
      display: "block",
    });
    $(".check").attr({
      disabled: true,
    });
    startPicture();
    $(".tth").text(`01:00`);
    sec = 60;
  });
});
