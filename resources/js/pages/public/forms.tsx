import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Heading } from '@/components/ui/heading'
import PublicLayout from '@/layouts/public-layout'

export default function Forms() {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Head title={t(($) => $.pages.public.forms.title)} />
      <div className="mx-auto w-245 space-y-4">
        <Heading
          tag="h1"
          h={t(($) => $.pages.public.forms.h1)}
          p={t(($) => $.pages.public.forms.title)}
        />
        <pre className="w-full overflow-auto rounded-xl border bg-[#0a0c10] p-4 text-sm text-[#f0f3f6]">
          <code
            dangerouslySetInnerHTML={{
              __html: `<span class="line"><span style="color:#FF9492">import</span><span style="color:#F0F3F6"> { EmailField, Form, InputEmailRule, InputPasswordRule, PasswordField, Schema, Submit } </span><span style="color:#FF9492">from</span><span style="color:#ADDCFF"> '@gmcode/forms'</span></span>
<span class="line"><span style="color:#FF9492">import</span><span style="color:#F0F3F6"> { store } </span><span style="color:#FF9492">from</span><span style="color:#ADDCFF"> '@/routes/login'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492">const</span><span style="color:#91CBFF"> schema</span><span style="color:#FF9492"> =</span><span style="color:#FF9492"> new</span><span style="color:#DBB7FF"> Schema</span><span style="color:#F0F3F6">({</span></span>
<span class="line"><span style="color:#F0F3F6">  email: </span><span style="color:#FF9492">new</span><span style="color:#DBB7FF"> InputEmailRule</span><span style="color:#F0F3F6">(),</span></span>
<span class="line"><span style="color:#F0F3F6">  password: </span><span style="color:#FF9492">new</span><span style="color:#DBB7FF"> InputPasswordRule</span><span style="color:#F0F3F6">()</span></span>
<span class="line"><span style="color:#F0F3F6">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492">export</span><span style="color:#FF9492"> default</span><span style="color:#FF9492"> function</span><span style="color:#DBB7FF"> Login</span><span style="color:#FFB757">() </span><span style="color:#F0F3F6">{</span></span>
<span class="line"><span style="color:#FF9492">  return</span><span style="color:#F0F3F6"> (</span></span>
<span class="line"><span style="color:#FF9492">    &lt;</span><span style="color:#FFB757">Form</span></span>
<span class="line"><span style="color:#F0F3F6">      defaults</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{{ </span><span style="color:#FFB757">email</span><span style="color:#F0F3F6">: </span><span style="color:#ADDCFF">''</span><span style="color:#F0F3F6">, </span><span style="color:#FFB757">password</span><span style="color:#F0F3F6">: </span><span style="color:#ADDCFF">''</span><span style="color:#F0F3F6"> }}</span></span>
<span class="line"><span style="color:#F0F3F6">      route</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{</span><span style="color:#DBB7FF">store</span><span style="color:#F0F3F6">()}</span></span>
<span class="line"><span style="color:#F0F3F6">      schema</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{schema}</span></span>
<span class="line"><span style="color:#FF9492">    &gt;</span></span>
<span class="line"><span style="color:#F0F3F6">      {({ </span><span style="color:#FFB757">form</span><span style="color:#F0F3F6">, </span><span style="color:#FFB757">loading</span><span style="color:#F0F3F6"> }) </span><span style="color:#FF9492">=&gt;</span><span style="color:#F0F3F6"> (</span></span>
<span class="line"><span style="color:#FF9492">        &lt;&gt;</span></span>
<span class="line"><span style="color:#FF9492">          &lt;</span><span style="color:#FFB757">EmailField</span></span>
<span class="line"><span style="color:#F0F3F6">            control</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{form.control}</span></span>
<span class="line"><span style="color:#F0F3F6">            inputId</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"email"</span></span>
<span class="line"><span style="color:#F0F3F6">            inputName</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"email"</span></span>
<span class="line"><span style="color:#F0F3F6">            label</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"Email address"</span></span>
<span class="line"><span style="color:#FF9492">          /&gt;</span></span>
<span class="line"><span style="color:#FF9492">          &lt;</span><span style="color:#FFB757">PasswordField</span></span>
<span class="line"><span style="color:#F0F3F6">            control</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{form.control}</span></span>
<span class="line"><span style="color:#F0F3F6">            inputId</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"password"</span></span>
<span class="line"><span style="color:#F0F3F6">            inputName</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"password"</span></span>
<span class="line"><span style="color:#F0F3F6">            label</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"Password"</span></span>
<span class="line"><span style="color:#FF9492">          /&gt;</span></span>
<span class="line"><span style="color:#FF9492">          &lt;</span><span style="color:#FFB757">Submit</span></span>
<span class="line"><span style="color:#F0F3F6">            label</span><span style="color:#FF9492">=</span><span style="color:#ADDCFF">"Login"</span></span>
<span class="line"><span style="color:#F0F3F6">            loading</span><span style="color:#FF9492">=</span><span style="color:#F0F3F6">{loading}</span></span>
<span class="line"><span style="color:#FF9492">          /&gt;</span></span>
<span class="line"><span style="color:#FF9492">        &lt;/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6">      )}</span></span>
<span class="line"><span style="color:#FF9492">    &lt;/</span><span style="color:#FFB757">Form</span><span style="color:#FF9492">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6">  )</span></span>
<span class="line"><span style="color:#F0F3F6">}</span></span>
<span class="line"></span>`
            }}
          />
        </pre>
      </div>
    </PublicLayout>
  )
}
