'use strict';

const container = document.querySelector('.posts');
const loader = document.querySelector('.loader');

async function loadPage(page) {
	const res = await fetch(`/page/${page}`);
	const html = await res.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const posts = doc.querySelector('.posts').children;

	for(let i = 0; i < posts.length; i++) {
		container.appendChild(posts[i].cloneNode(true));
	}
}

let current_page = Number(container.dataset.page);
let total_pages = Number(container.dataset.totalPages);
let is_fetching = false;

async function fetchNextPage() {
	if(is_fetching) return;
	if(current_page == total_pages) return;

	is_fetching = true;
	loader.classList.remove('dn');
	await loadPage(current_page + 1);
	is_fetching = false;
	current_page = current_page + 1;
	loader.classList.add('dn');
}

function handlePageBoundary(entries, observer) {
	entries.forEach(function(entry) {
		if(entry.isIntersecting && entry.intersectionRatio > 0) {
			fetchNextPage();
		}
	});
}

const observer = new IntersectionObserver(handlePageBoundary, {rootMargin: '0px', threshold: 0});
observer.observe(document.querySelector('.pageBoundary'));