 const renderPost = (item, order) => {
    const post = document.createElement("div");
    post.id = item._id;
    const postPostedByContainer = document.createElement("div");
    const postBodyContainer = document.createElement("div");
    postBodyContainer.style = "display: flex;flex-direction: column;padding: 6px 0 18px 0";
    postPostedByContainer.style="display: flex;flex-direction: row;font-size: 10px;margin-bottom: 5px;border-style: solid;border-bottom-width: thin;border-color: #888; border-width: 0 0 1px 0;padding-bottom: 5px";
    const actionBar = document.createElement("div");
    actionBar.style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;";
    post.style = "background-color: #111;padding: 8px 16px 8px 16px;align-items: start;border-radius: 5px;,margin-bottom: 10px;margin-top: 8px;"
    const postBody = document.createTextNode(`${item.text}`);
    postBodyContainer.appendChild(postBody);
    if(item.hyperlink.length > 0) {
        const hyperlink = document.createElement('a');
        hyperlink.href = item.hyperlink;
        hyperlink.style="color: #2089FE";
        hyperlink.textContent = item.hyperlink;
        postBodyContainer.appendChild(hyperlink)
    }  
    
    if(item.img.length > 0) {
        const photo = document.createElement('img');
        photo.src = item.img;
        photo.style="width: 100%;max-height: 200px;border-radius: 7px;margin-top:10px;"
        postBodyContainer.appendChild(photo);
    }
    if(item.chart) {
        const chartArea = document.createElement('div');
        chartArea.style="display: flex;margin-top: 10px;margin-bottom: 10px;max-height: 300px;border-width: 1px;border-style: solid;align-items: center;justify-content: center;width: 100%;padding: 8px"
        const canvas = document.createElement('canvas');
        chartArea.appendChild(canvas);

        const data = {
            labels: [...item.chart.labels],
            datasets: [{
                label: item.chart.data.label,
                data: [...item.chart.data.items],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        };

        const options = item.chart.type == 'bar' ? {scales: {y:{beginAtZero: true}}} : null;

        new Chart(canvas, {
            type: item.chart.type,
            data: data,
            options: options
        });
        postBodyContainer.appendChild(chartArea);
    }
    const photo = document.createElement('img');
    const likeElement = document.createElement('div');
    const rePostElement = document.createElement('div');
    const commentElement = document.createElement('div');
    const moreOptionsElement = document.createElement('div')
    likeElement.innerHTML = `<div style="display: flex;flex-direction: row;align-items: center;justify-content: center"><button id='like_post_${item._id}' onClick='like(${item._id})' title="like" style='background: none;border:none;outline:none;'><ion-icon name=${item.liked ? 'heart' : 'heart-outline'} color="danger"></ion-icon></button><div style="color:#eb4034;margin-left: 10px;margin-bottom: 7px" id="text_like_postId_${item._id}">${formatLikes(item.likes)}</div></div>`;
    rePostElement.innerHTML = `<button id='repost_post_${item._id}' onClick='repost(${item._id})' title="repost" style='background: none;border:none;outline:none;'><ion-icon name="arrow-redo-outline" color="medium"></ion-icon></button>`;
    commentElement.innerHTML = '<ion-icon name="chatbox-outline"></ion-icon>';
    moreOptionsElement.innerHTML = '<ion-icon name="ellipsis-vertical-outline"></ion-icon>';
    postPostedByContainer.innerHTML = `<div style="display: flex;flex-direction:row;align-items: center;justify-content: space-between;width: 100%;max-height: 300px"><div style="display: flex;flex-direction: row;align-items: center"><img src="${item.postedBy.photo}" style="height: 30px;width: 30px;margin-right: 10px"></img><div style="font-size: 12px;margin-right: 5px">${item.postedBy.name}</div><div>${'&#8226;    ' + item.postedBy.title}</div></div><div>${item.date}</div></div>`
    actionBar.appendChild(likeElement);
    actionBar.appendChild(rePostElement);
    actionBar.appendChild(commentElement);
    actionBar.appendChild(moreOptionsElement);
    post.appendChild(postPostedByContainer);
    post.appendChild(postBodyContainer);
    post.appendChild(actionBar);
    order === 'reverse' ? feed.insertBefore(post, document.getElementById(postLastPostId > 4 ? postLastPostId : 1)) : feed.appendChild(post);
}

function repost(id) {
    const item = posts.find((x) => x._id == id);
    const post = {_id: postLastPostId+1,postedBy:{name: "Guest", title: "Tester", photo: "public/images/avatar-default-icon.png",_id:2}, text: '', likes: 0, liked: false, date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`, hyperlink:'', img: '', };
    posts.unshift(post);
    const postDiv = document.createElement("div");
    postDiv.id = post._id;
    const postPostedByContainer = document.createElement("div");
    postPostedByContainer.style="display: flex;flex-direction: row;font-size: 10px;margin-bottom: 5px;border-style: solid;border-bottom-width: thin;border-color: #888; border-width: 0 0 1px 0;padding-bottom: 5px";
    const actionBar = document.createElement("div");
    actionBar.style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;";
    postDiv.style = "background-color: #111;padding: 8px 16px 8px 16px;align-items: start;border-radius: 5px;margin-bottom: 10px;margin-top: 8px";
    const sharedPost = document.createElement('div');
    sharedPost.style="display: flex;flexDirection: column;margin-top: 10px;border: 1px solid;border-color: #777;border-radius: 10px;padding: 16px;margin-bottom: 10px";
    sharedPost.innerHTML = `<div style="display: flex;flex-direction: column;">${item.text} ${item.hyperlink.length > 0 && `<div><a href=${item.hyperlink} style="color: 2089FE">${item.hyperlink}</a></div>`}</div>`;
    const likeElement = document.createElement('div');
    const rePostElement = document.createElement('div');
    const commentElement = document.createElement('div');
    const moreOptionsElement = document.createElement('div')
    likeElement.innerHTML = `<div style="display: flex;flex-direction: row;align-items: center;justify-content: center"><button id='like_post_${post._id}' onClick='like(${post._id})' title="like" style='background: none;border:none;outline:none;'><ion-icon name=${post.liked ? 'heart' : 'heart-outline'} color="danger"></ion-icon></button><div style="color:#eb4034;margin-left: 10px;margin-bottom: 7px" id="text_like_postId_${post._id}">${formatLikes(post.likes)}</div></div>`;
    rePostElement.innerHTML = `<ion-icon name="arrow-redo-outline" color="medium"></ion-icon>`;
    commentElement.innerHTML = '<ion-icon name="chatbox-outline"></ion-icon>';
    moreOptionsElement.innerHTML = '<ion-icon name="ellipsis-vertical-outline"></ion-icon>';
    postPostedByContainer.innerHTML = `<div style="display: flex;flex-direction:row;align-items: center;justify-content: space-between;width: 100%"><div style="display: flex;flex-direction: row;align-items: center"><img src="${post.postedBy.photo}" style="height: 30px;width: 30px;margin-right: 10px"></img><div style="font-size: 12px;margin-right: 5px">${post.postedBy.name}</div><div>${'&#8226;    ' + post.postedBy.title} &#8226;    reposted</div></div></div>${post.date}</div></div>`
    actionBar.appendChild(likeElement);
    actionBar.appendChild(rePostElement);
    actionBar.appendChild(commentElement);
    actionBar.appendChild(moreOptionsElement);
    postDiv.appendChild(postPostedByContainer);
    postDiv.appendChild(sharedPost);
    postDiv.appendChild(actionBar);
    feed.insertBefore(postDiv, document.getElementById(postLastPostId > 4 ? postLastPostId : 1));
    postLastPostId++;
}