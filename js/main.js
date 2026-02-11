let productData = [];  // json 파일 저장
let cart = []; // 장바구니 카트 
let totalPrice = 0;

$.get("./json/store.json").done(function(data) {
    
     productData = data.products;  // json => 어레이 안의 오브젝트의 키를 정의 
    
    function render(products) {
        $('.card-data').html('');
        
        products.forEach((a)=>{    // 정의한 키를 하나씩 반복
        const htmls =  `<div class="col-md-3">
                            <div class="item" draggable="true" data-id=${a.id}>
                                <img src="./img/${a.photo}" class="card-img-top" draggable="false">
                                <h5>${a.title}</h5>
                                <p>${a.brand}</p>
                                <p>${a.price}</p>
                                <button type="button" class="add btn btn-dark" data-id=${a.id}>담기</button>
                            </div>
                        </div>`;
        $('.card-data').append(htmls);  
        });
    }
    render(productData);
    
    // 검색기능 
    
    $('.search').on('input', function(){   //서치의 값이 바뀔때 
    
        let inputValue = $(this).val();     // 서치의 내용을 저장
        let searchValue = productData.filter(function(a){ // json파일을 필터를 한다.

            return a.title.indexOf(inputValue) != -1; // json파일의 title이 서치의 내용과 같으면 return함
                
        });
        
        render(searchValue);                  //같은 내용만 있는 것을 랜더링함 
        
    });
    
    
    $('.add').click(function(e){ 
        
        // 누른 버튼의 id값과 전체 data의 id 값을 비교
        // id값이 동일하다면 꺼내서 새로운 배열에 저장
        // 새로운 배열만 화면에 출력
        
        let cardId = e.target.dataset.id;  //내가 누른 data-id값을 저장
        
        
        let cartData = cart.findIndex((a) => { return a.id == cardId; });  //카트에 id 값이 들어있는지 확인 없으면 -1 있으면 몇번 인덱스에 있는지 알려줌
        
        if(cartData == -1){
            let product = productData.find((a) => { return a.id == cardId; }); // 전체 데이터 중에 id값이 같은것을 꺼냄
            product.count = 1;    //count 키 추가 값은 1 products는 object
            cart.push(product);  //빈 cart(array에 object 자료형인 product을 집어넣는다   
            //console.log(cart);
            //console.log(product);
            //console.log(cartData);
        } else {
            cart[cartData].count++; // cart의 id가 같은 인덱스를 찾아서 count를 1올려준다
            //console.log(cartData);
        }
        
        
        
         $('.drag').html(''); // 기존에 있던 html 삭제 중복 방지하기 위해서
                
        cart.forEach((a, i)=>{    // 정의한 키를 하나씩 반복
            const htmls =`<div class="col-md-3">
                            <div class="item" data-id=${a.id}>
                                <img src="./img/${a.photo}" class="card-img-top" draggable="false">
                                <h5>${a.title}</h5>
                                <p>${a.brand}</p>
                                <p>${a.price}</p>
                                <input type="number" value="${a.count}">
                            </div>
                        </div>`;        
        //class가 drag인 영역에 id가 []인 요소를 을 삽입한다. 
        $('.drag').append(htmls);
        });
        
        
        
        // 최종금액 구현
        

        cart.forEach(function(a){
            totalPrice += a.price * a.count;
        });
        
        $('.totalPrice').html(`${totalPrice}`);
    });
    
    
    // drag and drop
    $('.item').on('dragstart', function(e){
       let dragCard = e.target.dataset.id;
        console.log(dragCard);
       e.originalEvent.dataTransfer.setData("id", dragCard);
    });
    
    $('.drag').on('dragover', function(e){
        e.preventDefault();
        console.log('드레그중');
    });
    
    $('.drag').on('drop', function(e){
        e.preventDefault();
        const dragData = e.originalEvent.dataTransfer.getData("id"); // 저장한 id값을 불러온다 즉(e.target.dataset.id)
        
        
        let cartData = cart.findIndex((a) => { return a.id == dragData; });  //카트에 id 값이 들어있는지 확인 없으면 -1 있으면 몇번 인덱스에 있는지 알려줌
        
        if(cartData == -1){
            let product = productData.find((a) => { return a.id == dragData; }); // 전체 데이터 중에 id값이 같은것을 꺼냄
            product.count = 1;    //count 키 추가 값은 1 products는 object
            cart.push(product);  //빈 cart(array에 object 자료형인 product을 집어넣는다   
            //console.log(cart);
            //console.log(product);
            //console.log(cartData);
        } else {
            cart[cartData].count++; // cart의 id가 같은 인덱스를 찾아서 count를 1올려준다
            //console.log(cartData);
        }
        
         $('.drag').html(''); // 기존에 있던 html 삭제 중복 방지하기 위해서
                
        cart.forEach((a, i)=>{    // 정의한 키를 하나씩 반복
            const htmls =`<div class="col-md-3">
                            <div class="item" data-id=${a.id}>
                                <img src="./img/${a.photo}" class="card-img-top" draggable="false">
                                <h5>${a.title}</h5>
                                <p>${a.brand}</p>
                                <p>${a.price}</p>
                                <input type="number" value="${a.count}">
                            </div>
                        </div>`;        
        //class가 drag인 영역에 id가 []인 요소를 을 삽입한다. 
        $('.drag').append(htmls);
        });
        
        
        let totalPrice = 0;

        cart.forEach(function(a){
            totalPrice += a.price * a.count;
        });
        
        $('.totalPrice').html(`${totalPrice}`);
        
    });
 

// 모달창 버튼 이벤트
}).fail(function() {
    console.log('실패');
});

$('.buy').click(()=>{
    $('.modal1').css('display', 'block');
});

$('.close').click(function(){
    $('.modal-container').css('display', 'none');
});
$('.modal-container').click(function(e){
    if(e.target == document.querySelector('.modal-container')){
        $('.modal1').css('display', 'none');
    }
});



// 컨버스 창 
let 이름 = '';
let 연락처 = '';

$('#name').on('input',function(){
    이름 = $('#name').val();
});

$('#phone').on('input',function(){
    연락처 = $('#phone').val();
});



$('.submit').click(()=>{
    $('.modal1').css('display', 'none');
    $('.modal2').css('display', 'block');
    
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    
    c.font = '18px dotum';
    c.fillText(`구매자: ${이름}`, 10, 30);

    c.fillText(`연락처: ${연락처}`, 10, 100);
    c.fillText(`총 가격: ${totalPrice}`, 10, 170);
    
});

