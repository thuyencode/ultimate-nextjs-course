'use client'

import { AskQuestionSchema, type AskQuestion } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import type { MDXEditorMethods } from '@mdxeditor/editor'
import { useRef, type KeyboardEvent, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { TagCard } from '../cards'
import Editor from '../editor'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

export const QuestionForm = (): ReactElement => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const form = useForm<AskQuestion>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: []
    }
  })

  const handleQuestionCreation = (data: AskQuestion): void => {
    console.log(data)
  }

  // eslint-disable-next-line complexity -- This is fine
  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const tagInput = e.currentTarget.value.trim()

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue('tags', [...field.value, tagInput.toLowerCase()])

        e.currentTarget.value = ''
        form.clearErrors('tags')
      } else if (tagInput.length >= 15) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag should be less than 15 characters'
        })
      } else if (field.value.includes(tagInput)) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag already exists'
        })
      }
    }
  }

  const handleTagRemove = (tag: string, field: { value: string[] }): void => {
    const newTags = field.value.filter((t) => t !== tag)

    form.setValue('tags', newTags)

    if (newTags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Tags are required'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-10'
        onSubmit={() => {
          void form.handleSubmit(handleQuestionCreation)
        }}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800 capitalize'>
                Question&apos;s title
                <span className='text-primary-500'>*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className='paragraph-regular background-light700_dark300 text-dark300_light700 no-focus light-border-2 min-h-[56px] border'
                  required
                  {...field}
                />
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question to your
                grumpy senior
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800 capitalize'>
                Detailed explanation of your problem
                <span className='text-primary-500'>*</span>
              </FormLabel>

              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800 capitalize'>
                Tags
                <span className='text-primary-500'>*</span>
              </FormLabel>

              <FormControl>
                <div>
                  <Input
                    className='paragraph-regular background-light700_dark300 text-dark300_light700 no-focus light-border-2 min-h-[56px] border'
                    required
                    placeholder='Add tags...'
                    onKeyDown={(e) => {
                      handleInputKeyDown(e, field)
                    }}
                  />
                  {field.value.length > 0 ? (
                    <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                      {field.value.map((tag) => (
                        <TagCard
                          key={tag}
                          name={tag}
                          _id={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => {
                            handleTagRemove(tag, field)
                          }}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Add up to 3 tags to describe what your question is about. Press
                enter to add a tag.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-16 flex justify-end'>
          <Button
            className='primary-gradient w-fit !text-light-900'
            type='submit'
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  )
}
