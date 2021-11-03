function findDeep(items, id) {
	if (!items) { return; }

	for (const item of items) {
		// Test current object
		if (item.id === id) { return item; }

		// Test children recursively
		const child = findDeep(item.children, id);
		if (child) { return child; }
	}
}

const store = new Vuex.Store({
	strict: true,
	state: {
		pages: [
      {'id' : 1, 'title' : 'home', children : []},
      {'id' : 2, 'title' : 'about', children : []},
      {'id' : 3, 'title' : 'articles', children : [
     		{'id' : 5, 'title' : 'article 1', children : []},
     		{'id' : 6, 'title' : 'article 2', children : []},
      ]
      },
      {'id' : 4, 'title' : 'contact', children : []}
    ]
  },
  getters : {
    pages: state => {
			// pages is list of pages, if parentId is defined this getter returns parent's children
			return parentId => {
				if (!parentId)
					return state.pages
				else
					node = findDeep(state.pages, parentId);
					return node.children
			}
		}
	},
	mutations: {
		setPages (state, { value, parentId }) {
    	if (!parentId)
        state.pages = value
      else {
        let node = findDeep(state.pages, parentId);
        node.children = value
      }
		},
	}
})

Vue.component('tree', {
	template: '#tree',
	name: 'tree',
		props: [
			'parentId'
		],
		computed: {
			pages: {
				get () {
					return this.$store.getters.pages(this.parentId)
				},
				set (value) {
					this.$store.commit('setPages', {
						value,
						parentId: this.parentId
					})
				}
			}
		},
		methods: {
			isParent (page) {
				return page.children.length > 0
			}
		}
	}
);

new Vue({
	el: '#main',
  store
})
