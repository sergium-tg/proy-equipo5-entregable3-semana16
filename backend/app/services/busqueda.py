from typing import Dict, Any, List, Tuple, Optional, Union

def busca_ordena(
    items_dict: Dict[Any, Any],
    q: int | str | None,
    search_fields: List[str],
    sort: str,
    order: str,
    offset: int,
    limit: int
) -> Tuple[List[Any], int]:

    results = list(items_dict.values())
    
    # busqueda
    if q is not None:
        search_query = str(q).lower()
        
        filtered_results = []
        for item in results:
            found = False
            for field in search_fields:
                if search_query in str(getattr(item, field, "")).lower():
                    found = True
                    break
            if found:
                filtered_results.append(item)
        results = filtered_results

    # ordenamiento
    if sort:
        results = sorted(
            results,
            key=lambda item: str(getattr(item, sort, "")).lower(),
            reverse=(order == "desc")
        )

    total = len(results)
    return results[offset: offset + limit], total