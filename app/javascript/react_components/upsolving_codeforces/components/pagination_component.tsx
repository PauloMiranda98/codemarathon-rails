import React from "react";

type PaginationProps = {
  currentPage: number,
  totalPages: number;
  onPageChange: (page: number) => void;
};

export class PaginationComponent extends React.Component<PaginationProps> {
  getPages(){
    const currentPage = this.props.currentPage;  
    let pages: Array<number> = [];
    
    if(this.props.totalPages <= 8){
      for(let i = 1; i <= this.props.totalPages; i++)
        pages.push(i);
    } else {
      pages = pages.concat([1, 2]);
    
      if(currentPage - 1 >= 4)
        pages.push(-1);
      
      for(let i = currentPage-1; i <= currentPage + 1; i++)
        if(i > 2 && i < this.props.totalPages - 1)
          pages.push(i);
    
      if(currentPage + 1 < this.props.totalPages - 2)
        pages.push(-1);
    
      pages = pages.concat([this.props.totalPages - 1, this.props.totalPages]);
    }
    return pages
  }

  render(){
    const currentPage = this.props.currentPage;  
    const pages = this.getPages();
    
    if(this.props.totalPages <= 1)
      return null;
    
    return (
      <nav>
        <ul className="inline-flex -space-x-px">
          <li>
            <button disabled={currentPage == 1} onClick={() => this.props.onPageChange(currentPage - 1)} className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Voltar</button>
          </li>
          {
            pages.map((page: number): JSX.Element => {
              if(page == -1){
                return (
                  <li>
                    <button disabled className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</button>
                  </li>
                )
              }else if (page == currentPage){
                return(
                  <li>
                    <button aria-current="page" disabled={currentPage == 1} className="py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</button>
                  </li>
                )
              }else{
                return(
                  <li>
                    <button onClick={() => this.props.onPageChange(page)} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</button>
                  </li>
                )  
              }
            })
          }
          <li>
            <button disabled={currentPage == this.props.totalPages} onClick={() => this.props.onPageChange(currentPage + 1)} className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Avançar</button>
          </li>
        </ul>
      </nav>
    );
  }
}