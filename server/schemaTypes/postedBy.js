import {defineType, defineField, defineArrayMember} from 'sanity'
export const postedBy = defineType({
    name: 'postedBy',
    title: 'PostedBy',
    type: 'reference',
    to:[{type:"user"}],
})