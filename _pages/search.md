---
permalink: /search/
layout: default
title: Search
sitemap: false
sidenav: false
---

<script>
  //<![CDATA[

  var urlParams = new URLSearchParams(window.location.search);
  var searchEndpoint = new URL(
    "{{site.searchgov.endpoint}}/api/v2/search/i14y"
  );
  params = {
    affiliate: "{{site.searchgov.affiliate}}",
    access_key: "{{site.searchgov.access_key}}",
    query: urlParams.get("query")
  };

  Object.keys(params).forEach(key =>
    searchEndpoint.searchParams.append(key, params[key])
  );

  fetch(searchEndpoint)
    .then(function(res) {
      return res.json();
    })
    .then(function(posts) {
      for (item in posts.web.results) {
        render_result(
          `
          <li class="padding-bottom-5 margin-top-4 usa-prose border-bottom-05 border-base-lightest">
            <b class="title"><a href="${posts.web.results[item]["url"]}">${
            posts.web.results[item]["title"]
          }</a></b>
            <div> ${posts.web.results[item]["snippet"]
              .replace(/\uE000/g, '<span class="bg-yellow">')
              .replace(/\uE001/g, "</span>")} </div>
          </li>
          `,
          true
        );
      }
    })
    .catch(function(ex) {
      console.log("parsing failed", ex);
    })
    .finally(function(e) {
      if (document.getElementById("search-results").childNodes.length == 0) {
        render_result(
          `<li class="h4" style="list-style: none">No results found</li>`,
          false
        );
      }
    });

  function render_result(content, append = true) {
    const previous = document.getElementById("search-results").innerHTML;
    document.getElementById("search-results").innerHTML =
      append == true ? previous + content : content;
  }

  //]]>
</script>

{% if site.searchgov %}
<ol id="search-results"></ol>
{% else %}
<script>
  window.location = "/";
</script>
{% endif %}