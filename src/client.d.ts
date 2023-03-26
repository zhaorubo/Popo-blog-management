interface ArticleList {
    id: number;
    title: string;
    active: '0' | '1';
    content: string;
    article_image: string;
    author_id: number;
    author_name: string;
    create_date: number;
    update_date: number;
    category: string;
}

declare interface Response {
    code: number;
    result: [];
    tips: string;
}

declare interface CreateArticleResquest {
    title: string;
    content: string;
    category: string;
    author_id: number;
    author_name: string;
    active: '0' | '1';
    article_image: string;
    create_date: number;
    update_date: number;
    author: null;
}

interface User {
    account: string;
    account_state: '0' | '1';
    article: Array;
    author_id: number;
    create_date: number;
    password: string;
    user_head: string | null;
    user_id: number;
    user_name: string;
}

interface ArticleForm {
    category: string;
    title: string;
    article_image: string;
    active: string;
}

interface CategoryData {
    label: string;
    value: string;
}

interface Category {
    label: string;
    active: string;
    article_num_total: number | null;
    id: number;
    create_date: number;
}
